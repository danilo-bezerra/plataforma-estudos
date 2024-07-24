"use client";

import "./player.css";

import { useEffect, useRef, useState } from "react";

import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from "@vidstack/react";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import useUpdateFile from "@/hooks/useUpdateFile";
import { FileV2 } from "@prisma/client";

//import { textTracks } from "./tracks";

type Props = {
  mediaSource?: string;
  data: FileV2;
  elapsedTime?: number;
  loop?: boolean;
};

export function Player({ mediaSource, loop, data, elapsedTime = 0 }: Props) {
  let player = useRef<MediaPlayerInstance>(null),
    [src, setSrc] = useState(mediaSource);
  const [lastElapsedTimeSaved, setLastElapsedTimeSaved] = useState(elapsedTime);

  const { updateElapsedTime } = useUpdateFile();

  useEffect(() => {
    if (player.current) {
      return player.current.subscribe(({ currentTime }) => {
        const currentSecondsElapsed = Math.floor(currentTime);

        if (
          currentSecondsElapsed % 10 == 0 &&
          currentTime > 10 &&
          currentSecondsElapsed != lastElapsedTimeSaved
        ) {
          setLastElapsedTimeSaved((l) => {
            if (l != currentSecondsElapsed) {
              updateElapsedTime(
                { contentId: data.contentId, fileId: data.id },
                Math.floor(currentTime)
              );
            }

            return currentSecondsElapsed;
          });
        }
      });
    }

    return player.current!.subscribe(({ paused, viewType }) => {});
  }, [data.contentId, data.id, lastElapsedTimeSaved, updateElapsedTime]);

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent
  ) {
    // We can configure provider's here.
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay(
    detail: MediaCanPlayDetail,
    nativeEvent: MediaCanPlayEvent
  ) {
    // ...
  }

  return (
    <>
      <MediaPlayer
        className="player"
        title={data.name || "Título não informado"}
        src={mediaSource}
        autoPlay
        crossOrigin
        playsInline
        onProviderChange={onProviderChange}
        onCanPlay={onCanPlay}
        ref={player}
        currentTime={data.elapsedTime || 0}
        loop={loop}
      >
        <MediaProvider>
          <Poster
            className="vds-poster"
            src="/images/aperte-o-play.gif"
            alt="cool dance"
          />
        </MediaProvider>

        <DefaultAudioLayout icons={defaultLayoutIcons} />
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </>
  );
}
