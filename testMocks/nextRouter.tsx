export function useRouter() {
  return {
    push: jest.fn(),
    prefetch: jest.fn(),
    query: {},
    asPath: "/",
  };
}
const forExport = { useRouter };

export default forExport;
