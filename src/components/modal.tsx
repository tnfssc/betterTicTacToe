import React, { FC } from "react";
import ReactModal, { Props as ReactModalProps } from "react-modal";

ReactModal.setAppElement(document.getElementById("modal")!);

export const Modal: FC<ReactModalProps> = props => <ReactModal {...props} />;
