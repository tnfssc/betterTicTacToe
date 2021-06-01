import * as React from "react";
import { FC } from "react";
import ReactModal, { Props as ReactModalProps } from "react-modal";

const appElement = document.getElementById("modal");

if (!appElement) throw new Error("div with id 'modal' not found!");

ReactModal.setAppElement(appElement);

export const Modal: FC<ReactModalProps> = (props) => <ReactModal {...props} />;
