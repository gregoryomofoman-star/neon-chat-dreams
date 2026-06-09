import { create } from "zustand";
import userVesper from "@/assets/user-vesper.jpg";
import userDorian from "@/assets/user-dorian.jpg";
import userSora from "@/assets/user-sora.jpg";
import userKai from "@/assets/user-kai.jpg";
import userZeno from "@/assets/user-zeno.jpg";
import coverTokyo from "@/assets/cover-tokyo.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import lockedMedia1 from "@/assets/locked-media-1.jpg";

export type User = {
  id: string;
  handle: string;
  name: string;
  avatar: string;
  ringColor: "pink" | "blue" | "purple";
  bio: string;
  cover: string;
  gallery: { id: string; src: string; locked?: boolean }[];
  online?: boolean;
};

export type Message = {
  id: string;
  fromMe: boolean;
  text?: string;
  media?: { id: string; src: string; cost: number };
  time: string;
};

export const USERS: Record<string, User> = {
  sora: {
    id: "sora",
    handle: "z_sorax",
    name: "Sora L.",
    avatar: userSora,
    ringColor: "pink",
    bio: "Lost in Tokyo, found in Z Desires. Exclusives dropping nightly. No refunds, just thrills. ⚡️",
    cover: coverTokyo,
    gallery: [
      { id: "s1", src: gallery1 },
      { id: "s2", src: gallery2 },
      { id: "s3", src: lockedMedia1, locked: true },
    ],
    online: true,
  },
  vesper: {
    id: "vesper",
    handle: "vesper.nyx",
    name: "Vesper",
    avatar: userVesper,
    ringColor: "pink",
    bio: "Architect of moonlit moments. DM for vault access.",
    cover: coverTokyo,
    gallery: [
      { id: "v1", src: lockedMedia1, locked: true },
      { id: "v2", src: gallery1 },
    ],
    online: true,
  },
  dorian: {
    id: "dorian",
    handle: "dorian_x",
    name: "Dorian",
    avatar: userDorian,
    ringColor: "blue",
    bio: "Codes by night. Lives in the static.",
    cover: coverTokyo,
    gallery: [{ id: "d1", src: gallery2 }],
  },
  kai: {
    id: "kai",
    handle: "kai.v",
    name: "Kai V.",
    avatar: userKai,
    ringColor: "purple",
    bio: "The arcade never closes.",
    cover: coverTokyo,
    gallery: [{ id: "k1", src: gallery1 }],
  },
};

export const ME: User = {
  id: "me",
  handle: "zeno.d",
  name: "Zeno D.",
  avatar: userZeno,
  ringColor: "purple",
  bio: "Lvl 12 Architect — building in the void.",
  cover: coverTokyo,
  gallery: [
    { id: "m1", src: gallery1 },
    { id: "m2", src: gallery2 },
  ],
};

type State = {
  coins: number;
  unlocked: Set<string>;
  messages: Record<string, Message[]>;
  unread: Record<string, number>;
  coinSheetOpen: boolean;
  unlock: (mediaId: string, cost: number) => boolean;
  purchase: (amount: number) => void;
  send: (chatId: string, text: string) => void;
  openCoinSheet: () => void;
  closeCoinSheet: () => void;
};

const seedMessages: Record<string, Message[]> = {
  sora: [
    { id: "1", fromMe: false, text: "Hey! I just posted some new shots from the Neo-Shibuya set ✨", time: "9:42" },
    { id: "2", fromMe: false, media: { id: "sora-m1", src: lockedMedia1, cost: 50 }, time: "9:42" },
    { id: "3", fromMe: true, text: "Looking amazing. Unlocking now.", time: "9:45" },
  ],
  vesper: [
    { id: "1", fromMe: false, text: "Are you coming to the vault tonight?", time: "11:12" },
  ],
  dorian: [
    { id: "1", fromMe: false, text: "The access code changed.", time: "Yesterday" },
  ],
  kai: [
    { id: "1", fromMe: false, text: "Arcade opens at midnight.", time: "Mon" },
  ],
};

export const useStore = create<State>((set, get) => ({
  coins: 1250,
  unlocked: new Set(),
  messages: seedMessages,
  unread: { sora: 2, vesper: 1 },
  coinSheetOpen: false,
  unlock: (mediaId, cost) => {
    const { coins, unlocked } = get();
    if (coins < cost) {
      set({ coinSheetOpen: true });
      return false;
    }
    const next = new Set(unlocked);
    next.add(mediaId);
    set({ coins: coins - cost, unlocked: next });
    return true;
  },
  purchase: (amount) => set((s) => ({ coins: s.coins + amount, coinSheetOpen: false })),
  send: (chatId, text) =>
    set((s) => ({
      messages: {
        ...s.messages,
        [chatId]: [
          ...(s.messages[chatId] ?? []),
          { id: crypto.randomUUID(), fromMe: true, text, time: "now" },
        ],
      },
    })),
  openCoinSheet: () => set({ coinSheetOpen: true }),
  closeCoinSheet: () => set({ coinSheetOpen: false }),
}));

export const CHAT_LIST = ["sora", "vesper", "dorian", "kai"];

export const COIN_PACKAGES = [
  { id: "light", label: "LIGHT", coins: 100, price: "$1.99" },
  { id: "pro", label: "PRO", coins: 500, price: "$7.99", best: true },
  { id: "elite", label: "ELITE", coins: 1500, price: "$19.99" },
  { id: "whale", label: "WHALE", coins: 5000, price: "$49.99" },
];
