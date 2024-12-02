
export interface CustomArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export type city ={
  name:string,
  total:number,
  icon:React.ReactElement,
  link: string;
}

export interface Stat {
  _id: string;
  label: string;
  total: number;
  icon: React.ReactElement;
  bg: string;
}
export  interface NavLinkProps {
  label: string;
  link: string;
  icon: React.ReactElement;
}
export interface SelectListProps {
  lists: string[];
  selected: string;
  setSelected: (value: string) => void;
  label?: string;
}
export interface UserActionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onClick?: () => void;
}
export interface ConfirmationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  msg?: string | any;
  setMsg?: (msg: string | null) => void;
  onClick?: () => void;
  type?: "delete" | "restore" | "restoreAll"| any;
  setType?: (type: "delete" | "restore" | "restoreAll") => void;
}
