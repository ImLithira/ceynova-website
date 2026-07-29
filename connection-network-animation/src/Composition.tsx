import { CalculateMetadataFunction, Composition } from "remotion";
import { Network } from "./Network";

export const FPS = 30;
export const DURATION_IN_FRAMES = 240;
export const WIDTH = 1920;
export const HEIGHT = 1080;

type Props = {};

// Defaults the Studio/CLI render settings to a transparent-alpha WebM (VP9)
// export -- ideal for overlaying on a light web background. See README.md
// for a ProRes/QuickTime alternative and the full render commands.
const calculateMetadata: CalculateMetadataFunction<Props> = () => {
  return {
    defaultCodec: "vp8",
    defaultVideoImageFormat: "png",
    defaultPixelFormat: "yuva420p",
  };
};

export const ConnectionNetworkComposition: React.FC = () => {
  return (
    <Composition
      id="ConnectionNetwork"
      component={Network}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      calculateMetadata={calculateMetadata}
    />
  );
};
