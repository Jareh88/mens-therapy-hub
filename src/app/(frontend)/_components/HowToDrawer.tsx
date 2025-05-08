import { themeWhite } from "@/app/constants";
import { Box, Drawer, Typography } from "@mui/material";

type FilterDrawerProps = {
  onClick: () => void;
  open: boolean;
};

export const HowToDrawer = ({ onClick, open }: FilterDrawerProps) => {
  return (
    <Box>
      <Drawer
        open={open}
        onClose={onClick}
        anchor="left"
        sx={{
          "& .MuiDrawer-paper": {
            top: "20px",
            bottom: "20px",
            height: "auto",
            borderRadius: "4px",
            display: "flex",
            alignItems: "stretch",
            width: 620,
            backgroundColor: themeWhite,
          },
        }}
      >
        <Box sx={{ height: "100%", p: 4 }}>
          <Typography variant="h3" mb={2}>
            How to choose a therapist:
          </Typography>
          <Typography variant="body2" mb={2}>
            Choosing a therapist can be a daunting task, so we want to make it
            as simple as possible. At the Men’s Therapy Hub, we’ve developed our
            ‘Get Matched’ service to help you find the right therapist for you.
          </Typography>
          <Typography variant="body2" mb={2}>
            If you&apos;re still not sure who might be best, here are some key
            points to consider when making your choice.
          </Typography>
          <Typography>1. Know What You’re Looking For</Typography>
          <Typography variant="body2" mb={2}>
            Start by reflecting on what you’re seeking from therapy. Are you
            dealing with anxiety, depression, relationship issues, or something
            else? Different therapists specialise in different areas and have
            different therapeutic approaches. Knowing what you want to focus on
            can help narrow down your search. If you’re unsure, that’s okay too.
            Most therapists have worked with clients on a variety of issues; ask
            them, a good therapist will be honest about their experiences.{" "}
          </Typography>
          <Typography>2. Consider Your Preferences</Typography>
          <Typography variant="body2" mb={2}>
            Therapy is a deeply personal experience. It’s important to find
            someone you feel comfortable with. Here are a few things to think
            about:
          </Typography>

          <ul style={{ marginLeft: "24px", marginBottom: 2 }}>
            <li>
              <Typography variant="body2" mb={2}>
                Personal Comfort: Would you feel more at ease talking to someone
                online from your own home, or away from home, in-person?
              </Typography>
            </li>
            <li>
              <Typography variant="body2" mb={2}>
                Communication Style: Do you prefer someone who is warm and
                nurturing or more structured and direct?
              </Typography>
            </li>
            <li>
              <Typography variant="body2" mb={2}>
                Cultural Understanding: Would you benefit from working with a
                therapist who shares or understands your cultural background or
                life experiences?
              </Typography>
            </li>
          </ul>
          <Typography>3. Review Credentials and Accreditation</Typography>
          <Typography variant="body2" mb={2}>
            In the UK, therapists typically hold qualifications such as a
            diploma or degree in counselling or psychotherapy. When choosing a
            therapist, it’s recommended to look for someone accredited by a
            professional body like the British Association for Counselling and
            Psychotherapy (BACP), the UK Council for Psychotherapy (UKCP), the
            National Counselling Society (NCS) and others. Accreditation ensures
            they meet professional standards and adhere to a code of ethics.
          </Typography>
          <Typography>4. Test the Fit</Typography>
          <Typography variant="body2" mb={2}>
            Many therapists offer a free or low-cost initial consultation. Use
            this opportunity to ask questions, share a bit about why you’re
            seeking therapy, and get a feel for how they work. Some questions to
            consider:
          </Typography>
          <ul style={{ marginLeft: "24px", marginBottom: 2 }}>
            <li>
              <Typography variant="body2" mb={2}>
                How do you typically structure sessions?
              </Typography>
            </li>
            <li>
              <Typography variant="body2" mb={2}>
                Have you worked with men facing similar challenges before?
              </Typography>
            </li>
            <li>
              <Typography variant="body2" mb={2}>
                What’s your approach to therapy?
              </Typography>
            </li>
          </ul>
          <Typography variant="body2" mb={2}>
            Trust your instincts during this conversation. A good therapeutic
            relationship is built on trust and rapport.
          </Typography>
          <Typography>5. Don’t Be Afraid to Change Therapists</Typography>
          <Typography variant="body2" mb={2}>
            Sometimes, even with careful consideration, a therapist might not be
            the right fit—and that’s okay. If you don’t feel a connection or,
            after a few sessions you don’t feel you’ll progress together, it’s
            perfectly acceptable to look for someone else. Therapy is about your
            well-being, and finding the right support is worth the effort.
          </Typography>
          <Typography>Final Thoughts</Typography>
          <Typography variant="body2" pb={4}>
            Starting therapy is a significant step toward better mental health
            and overall well-being. By taking the time to find the right
            therapist, you’re investing in a supportive relationship that can
            help you navigate challenges, explore new perspectives, and make
            meaningful changes in your life. Remember, you don’t have to be
            alone with everything.{" "}
          </Typography>
        </Box>
      </Drawer>
    </Box>
  );
};
