import React from 'react';
import { Region, SourceType, Tag } from './types';

export const APP_NAME = "Post-Secondary Daily";
export const SUBTITLE = "Curated higher-ed news for Manitoba & beyond";

export const MANITOBA_INSTITUTIONS = [
  "Assiniboine Community College",
  "Brandon University",
  "Red River College Polytechnic",
  "Université de Saint-Boniface",
  "University College of the North",
  "University of Manitoba",
  "University of Winnipeg",
  "Manitoba Institute of Trades and Technology",
];

// Reusable SVG Icons defined with React.createElement for .ts compatibility
export const Icons = {
  Search: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, React.createElement("circle", { cx: "11", cy: "11", r: "8" }), React.createElement("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })),

  Filter: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, React.createElement("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" })),

  ExternalLink: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, React.createElement("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }), React.createElement("polyline", { points: "15 3 21 3 21 9" }), React.createElement("line", { x1: "10", y1: "14", x2: "21", y2: "3" })),

  Sparkles: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "text-amber-500"
  }, React.createElement("path", { d: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" })),

  Refresh: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, React.createElement("path", { d: "M21 2v6h-6" }), React.createElement("path", { d: "M3 12a9 9 0 0 1 15-6.7L21 8" }), React.createElement("path", { d: "M3 22v-6h6" }), React.createElement("path", { d: "M21 12a9 9 0 0 1-15 6.7L3 16" })),

  Newspaper: () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, React.createElement("path", { d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" }), React.createElement("path", { d: "M18 14h-8" }), React.createElement("path", { d: "M15 18h-5" }), React.createElement("path", { d: "M10 6h8v4h-8V6Z" }))
};