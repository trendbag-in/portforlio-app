// Real looks posted on TrendBag by the founders, used with their consent.
// 1920×2560 portraits; fy is how far down the frame the person is.
const OOTD = 'https://assets.trendbag.in/ootd';

export const LOOKS = [
  { id: '1103090b-0341-4ef5-94b4-a6e47ccb719a', fy: 35 },
  { id: 'a168c231-99b7-416e-b5f0-e8fe277ac40e', fy: 22 },
  { id: '1627aa69-1e1f-449b-95fb-6f528b952ab3', fy: 45 },
  { id: '61acb212-19fa-4bab-afe8-a619d1cc3d92', fy: 45 },
  { id: 'e562fd0d-d6fb-424b-b87a-ed5dd8c095ea', fy: 70 },
  { id: 'c5c9b85b-f426-45c4-b3d3-81095f09918c', fy: 50 },
  { id: '84847218-65ff-4f53-a3f4-d4c5923547c5', fy: 22 },
  { id: 'df1c1997-239e-4e94-a254-c1deaf0f91a9', fy: 60 },
  { id: 'b4b61dce-71db-4fff-9a26-057cd5d6fbd9', fy: 65 }
].map((l) => ({ ...l, src: `${OOTD}/${l.id}.jpg` }));
