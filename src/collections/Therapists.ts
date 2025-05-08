import type {
  CollectionConfig,
  CollectionBeforeChangeHook,
  CollectionAfterChangeHook,
  AccessArgs,
  Where,
} from "payload";
import slugify from "slugify";
import nodemailer from "nodemailer";

// Hook – only one profile per non‑admin user
const ensureSingleProfile: CollectionBeforeChangeHook = async ({
  req,
  operation,
  data,
  originalDoc,
}) => {
  if (req.user?.role === "admin") return data;

  if (operation === "create") {
    const existing = await req.payload.find({
      collection: "therapists",
      where: { owner: { equals: String(req.user!.id) } },
      pagination: false,
    });
    if (existing.totalDocs > 0) {
      throw new Error("You may only create one therapist profile.");
    }
  }

  if (operation === "update" && originalDoc?.owner !== req.user!.id) {
    throw new Error("You can only edit your own profile.");
  }
  return data;
};

// Hook – notify when approvalStatus changes
const notifyApprovalChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
}) => {
  if (!previousDoc || doc.approvalStatus === previousDoc.approvalStatus) return;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const recipient =
    typeof doc.owner === "object" && "email" in doc.owner
      ? (doc.owner.email as string)
      : undefined;

  if (recipient) {
    await transporter.sendMail({
      from: "admin@mytherapyhub.com",
      to: recipient,
      subject: `Your profile is now ${doc.approvalStatus}`,
      text:
        doc.approvalStatus === "approved"
          ? "Congratulations! Your therapist profile is now live."
          : doc.approvalStatus === "rejected"
            ? "Sorry, your profile was rejected. Please contact support."
            : "",
    });
  }

  if (process.env.APPROVAL_WEBHOOK_URL) {
    await fetch(process.env.APPROVAL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        therapistId: doc.id,
        newStatus: doc.approvalStatus,
      }),
    });
  }
};

const readAccess = ({ req }: AccessArgs): true | Where => {
  // admins see everything
  if (req.user?.role === "admin") return true;

  // logged‑in therapists see their own doc + all approved docs
  if (req.user) {
    const ownerFilter: Where = { owner: { equals: String(req.user.id) } };
    const approved: Where = { approvalStatus: { equals: "approved" } };
    return { or: [ownerFilter, approved] };
  }

  return { approvalStatus: { equals: "approved" } };
};

export const Therapists: CollectionConfig = {
  slug: "therapists",
  admin: { useAsTitle: "name" },

  fields: [
    {
      name: "owner",
      type: "relationship",
      relationTo: "users",
      required: true,
      access: { create: () => false, update: () => false, read: () => true },
      admin: { condition: (_, { user }) => user?.role === "admin" },
    },
    {
      name: "approvalStatus",
      type: "select",
      defaultValue: "pending",
      options: [
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
      ],
      access: {
        read: ({ req }) => req.user?.role === "admin",
        create: ({ req }) => req.user?.role === "admin",
        update: ({ req }) => req.user?.role === "admin",
      },
      admin: {
        position: "sidebar",
        condition: (_, { user }) => user?.role === "admin",
      },
    },

    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "text",
      required: true,
    },
    {
      label: "Profession or role (eg. Integrative Psychotherapist)",
      name: "profession",
      type: "text",
      required: true,
    },
    {
      name: "biography",
      type: "richText",
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    {
      label: "Session Communication Method (multi-select)",
      name: "communication_method",
      type: "select",
      hasMany: true,
      options: ["In Person", "Online", "Phone", "Home Visits"],
      required: true,
    },
    {
      name: "address",
      type: "textarea",
    },
    {
      name: "phone_number",
      type: "text",
    },
    {
      label: "Fee per hour (£)",
      name: "fee_per_hour",
      type: "text",
    },
    {
      name: "website_link",
      type: "text",
    },
    {
      label: "Qualifications and Accrediations Section",
      type: "collapsible",
      fields: [
        {
          name: "qualifications_and_accreditations",
          type: "array",
          fields: [
            {
              name: "qualification",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      label: "Age ranges worked with (multi-select)",
      name: "ages_worked_with",
      type: "select",
      hasMany: true,
      options: ["14-18", "18-65", "65+"],
      required: true,
    },
    {
      label: "Your Faith Group/Belief System (if any)",
      name: "faith",
      type: "select",
      options: [
        "African Traditional & Diasporic",
        "Agnostic",
        "Atheist",
        "Baha'i",
        "Buddhism",
        "Cao Dai",
        "Chinese traditional religion",
        "Christianity",
        "Hinduism",
        "Islam",
        "Jainism",
        "Juche",
        "Judaism",
        "Neo-Paganism",
        "Non-religious",
        "Rastafarianism",
        "Secular",
        "Shinto",
        "Sikhism",
        "Spiritism",
        "Tenrikyo",
        "Unitarian-Universalism",
        "Zoroastrianism",
        "Primal-indigenous",
        "Other",
      ],
    },
    {
      label: "Insurance Coverage",
      type: "collapsible",
      fields: [
        {
          name: "insurances",
          type: "array",
          fields: [
            {
              name: "insurance",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      label: "Fluent Languages Spoken (multi-select)",
      name: "languages_spoken",
      type: "select",
      hasMany: true,
      required: true,
      options: [
        "English",
        "Spanish",
        "French",
        "German",
        "Mandarin",
        "Cantonese",
        "Hindi",
        "Bengali",
        "Punjabi",
        "Urdu",
        "Portuguese",
        "Arabic",
        "Russian",
        "Italian",
        "Japanese",
        "Korean",
        "Swedish",
        "Dutch",
        "Turkish",
        "Polish",
        "Tamil",
        "Gujarati",
        "Malay",
        "Greek",
        "Vietnamese",
        "Thai",
        "Farsi",
        "Hebrew",
        "Swahili",
        "Zulu",
        "Afrikaans",
        "Norwegian",
        "Danish",
        "Finnish",
        "Hungarian",
        "Czech",
        "Slovak",
        "Romanian",
        "Bulgarian",
        "Serbian",
        "Croatian",
        "Bosnian",
        "Albanian",
        "Ukrainian",
        "Latvian",
        "Lithuanian",
        "Estonian",
        "Welsh",
        "Irish",
        "Scottish Gaelic",
      ],
    },
    {
      name: "sexuality",
      type: "select",
      options: ["Heterosexual", "Bisexual", "LGBTQ+", "Prefer not to state"],
    },
    {
      name: "ethnicity",
      type: "select",
      options: [
        "African / Black / Afro-Carribean",
        "Asian",
        "Arab / Middle-Eastern",
        "Hispanic / Latino / Latinx",
        "European / White",
        "Mixed / Multi-ethnic",
        "Jewish",
        "Other",
      ],
    },
    {
      label: "Short description on the process to start therapy with you",
      name: "how_we_start",
      type: "textarea",
    },
    {
      label: "Therapy types offered (multi-select)",
      name: "therapy_types_offered",
      type: "select",
      hasMany: true,
      required: true,
      options: [
        "Accelerated experiential dynamic psychotherapy (AEDP)",
        "Acceptance and commitment therapy (ACT)",
        "Adlerian therapy",
        "Animal-assisted therapy",
        "Applied psychology",
        "Art therapy",
        "Attachment-based therapy",
        "Behavioural therapy",
        "Bibliotherapy",
        "Coaching",
        "Cognitive analytic therapy (CAT)",
        "Cognitive behavioural therapy (CBT)",
        "Cognitive processing therapy (CPT)",
        "Cognitive stimulation therapy",
        "Cognitive therapy",
        "Compassion-focused therapy",
        "Core process psychotherapy",
        "Couples therapy",
        "Dance therapy",
        "Dialectical behavioural therapy (DBT)",
        "Dynamic interpersonal therapy",
        "Eclectic counselling",
        "EMDR",
        "Emotion-focused therapy",
        "Emotional freedom technique (EFT)",
        "Emotionally focused couple therapy (EFT)",
        "Equine therapy",
        "Existential therapy",
        "Experiential therapy",
        "Exposure and response prevention (ERP)",
        "Family Therapy",
        "Gestalt therapy",
        "Group therapy",
        "Human Givens psychotherapy",
        "Humanistic therapy",
        "Hypnotherapy",
        "Imago relationship therapy (IRT)",
        "Integrative counselling",
        "Intercultural therapy",
        "Internal family systems therapy (IFS)",
        "Interpersonal therapy",
        "Jungian therapy",
        "Mentalisation-based therapy",
        "Mindfulness",
        "Motivational interviewing (MI)",
        "Narrative therapy",
        "Neuro-linguistic programming (NLP)",
        "Neurofeedback",
        "Person-centred therapy",
        "Positive psychology",
        "Prolonged exposure therapy (PET)",
        "Psychoanalysis",
        "Psychoanalytic therapy",
        "Psychodrama",
        "Psychodynamic therapy",
        "Psychosexual therapy",
        "Psychosynthesis",
        "Rational emotive behaviour therapy (REBT)",
        "Reality therapy",
        "Relational therapy",
        "Schema therapy",
        "Social recovery therapy",
        "Solution focused brief therapy",
        "Somatic therapy",
        "Strength-based therapy",
        "Structural family therapy",
        "Systemic therapy",
        "The Gottman Method",
        "Transactional analysis",
        "Transpersonal psychology",
        "Trauma-focused CBT",
        "Walk and talk therapy",
      ],
    },
    {
      label: "Specialisms (multi-select)",
      name: "specialisms",
      type: "select",
      hasMany: true,
      required: true,
      options: [
        "Abortion",
        "Abuse",
        "Addiction",
        "ADHD",
        "Adoption counselling for adults",
        "Affairs and betrayals",
        "Alcoholism",
        "Anger management",
        "Anorexia nervosa",
        "Antisocial personality disorder",
        "Anxiety",
        "ARFID",
        "Attachment disorder in children",
        "Attachment disorder",
        "Autism",
        "Avoidant personality disorder",
        "Baby loss",
        "Behaviour problems",
        "Bereavement",
        "Binge-eating disorder",
        "Bipolar disorder",
        "Blended family",
        "Boarding school syndrome",
        "Body dysmorphic disorder (BDD)",
        "Borderline personality disorder (BPD)",
        "Bulimia nervosa",
        "Bullying",
        "Burnout",
        "Cancer",
        "Career counselling",
        "Carer support",
        "Child counselling",
        "Childhood bereavement",
        "Childhood bullying",
        "Childless not by choice",
        "Children’s learning difficulties",
        "Chronic fatigue syndrome/ME",
        "Chronic illness",
        "Climate and eco-anxiety",
        "Dementia",
        "Dependent personality disorder",
        "Depression and anxiety in children",
        "Depression",
        "Disabilities",
        "Discrimination",
        "Dissociation",
        "Domestic abuse",
        "Drug addiction",
        "Dyslexia",
        "Dyspraxia",
        "Eating disorders",
        "Emotional abuse",
        "Family issues",
        "Gambling",
        "Gender dysphoria",
        "Generalised anxiety disorder (GAD)",
        "Health anxiety",
        "Hearing voices",
        "High sensitivity",
        "Histrionic personality disorder",
        "HIV/AIDS",
        "Hoarding",
        "Infertility",
        "Internet addiction",
        "Jealousy",
        "Kink-aware therapy",
        "Learning difficulties",
        "Learning disabilities",
        "LGBTQ+ counselling",
        "Loneliness",
        "Low self-confidence",
        "Low self-esteem",
        "Mental health",
        "Miscarriage",
        "Money",
        "Narcissistic abuse",
        "Narcissistic personality disorder",
        "Neurodiversity",
        "Non-monogamy",
        "Obsessive compulsive disorder (OCD)",
        "Obsessive-compulsive personality disorder",
        "Older people's counselling",
        "Panic attacks",
        "Paranoia",
        "Paranoid personality disorder",
        "Passive-aggressive behaviour",
        "Perfectionism",
        "Personality disorders",
        "Phobias",
        "Physical abuse",
        "Post-traumatic stress disorder (PTSD)",
        "Postnatal depression",
        "Psychosis",
        "Race and racial identity",
        "Racism",
        "Redundancy",
        "Relationship problems",
        "Schizoid personality disorder",
        "Schizophrenia",
        "Schizotypal personality disorder",
        "Seasonal affective disorder (SAD)",
        "Self-harm",
        "Separation and divorce",
        "Separation anxiety",
        "Sex addiction",
        "Sex problems",
        "Sexual abuse",
        "Sexual assault",
        "Smoking cessation",
        "Social anxiety",
        "Spirituality",
        "Stress",
        "Suicidal thoughts",
        "Tourette's syndrome",
        "Trauma",
        "Trichotillomania",
        "Work-related stress",
        "Young carers",
        "Young people's counselling",
      ],
    },
    {
      name: "slug",
      label: "URL slug (auto‑generated if left blank)",
      type: "text",
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [
          ({ data = {} }) => {
            if (data.name && !data.slug) {
              data.slug = slugify(data.name, { lower: true, strict: true });
            }
            return data;
          },
        ],
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ req, data = {} }) => {
        if (!data.owner && req.user) data.owner = req.user.id;
        return data;
      },
    ],
    beforeChange: [ensureSingleProfile],
    afterChange: [notifyApprovalChange],
  },
  access: {
    create: ({ req }) => !!req.user,
    read: readAccess,
    update: ({ req }) =>
      req.user?.role === "admin" || { owner: { equals: String(req.user?.id) } },
    delete: ({ req }) =>
      req.user?.role === "admin" || { owner: { equals: String(req.user?.id) } },
  },
};

export default Therapists;
