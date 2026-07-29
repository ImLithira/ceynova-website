# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Connection Network animation

The `ConnectionNetwork` composition (`src/Network.tsx`) is a transparent-background
"dispersed 1-to-1 connections" animation for "connecting people and opportunities":
nodes are widely scattered across the canvas in strictly isolated pairs (never shared
between connections, no polygons or webs), and each pair periodically fires a spark
that sweeps along a shallow Bezier curve from one node to the other with a glowing head
and a fading gradient trail, then dissolves. Colors are Dark Slate `#2c2f36` and
Gold/Brass `#a6895a` as the dominant palette, with Sky Blue and `#e0438f` reserved for
rare accent highlights on the traveling head and the destination node's arrival pulse.

- Composition id: `ConnectionNetwork`
- 1920x1080, 30fps, 240 frames (8s)
- Root container has **no** background fill -- it renders transparent.

### Exporting with a transparent background

The composition's `calculateMetadata` already defaults the Studio/CLI render to a
transparent WebM (VP9, `yuva420p`), so a plain render should already come out
transparent:

```console
npx remotion render ConnectionNetwork out.webm
```

To be explicit, or to force it from the CLI:

```console
npx remotion render --image-format=png --pixel-format=yuva420p --codec=vp9 ConnectionNetwork out.webm
```

For use in video editing software instead of the browser, export transparent ProRes:

```console
npx remotion render --image-format=png --pixel-format=yuva444p10le --codec=prores --prores-profile=4444 ConnectionNetwork out.mov
```

Standard MP4/H.264 has no alpha channel -- don't render to `.mp4` if you need
transparency; use the WebM or ProRes commands above instead.

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
