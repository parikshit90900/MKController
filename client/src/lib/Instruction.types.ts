export enum InstructionType {
  KeyBoardKeys = "KeyBoardKeys",
  KeyEvent = "KeyEvent",
  KeyHold = "KeyHold",
  KeyRelease = "KeyRelease",
  MouseMove = "MouseMove",
  MouseMoveRel = "MouseMoveRel",
  MouseClickLeft = "MouseClickLeft",
  MouseClickRight = "MouseClickRight",
  MouseClickMiddle = "MouseClickMiddle",
  MouseClickDoubleLeft = "MouseClickDoubleLeft",
  DSL = "DSL",
}

export const keyBoardEvent = [
  InstructionType.KeyEvent,
  InstructionType.KeyHold,
  InstructionType.KeyRelease,
];

export const MouseClickEvents = [
  InstructionType.MouseClickLeft,
  InstructionType.MouseClickRight,
  InstructionType.MouseClickMiddle,
  InstructionType.MouseClickDoubleLeft,
];

export const MouseMoveEvent = [
  InstructionType.MouseMove,
  InstructionType.MouseMoveRel,
];

export enum EventType {
  SingleClick,
  DoubleClick,
  TripleClick,
  TwoClick,
  ThreeClick,
  Move = 0b1111000,
  LeftMove = 0b0010000,
  RightMove = 0b0001000,
  TopMove = 0b1000000,
  DownMove = 0b0100000,
  XMove = 0b0011000,
  YMove = 0b1100000,
}

export interface Instruction {
  type: InstructionType;
  info?: string;
}
