import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import * as React from "react";
import { ReactNode } from "react";
import { confirmable, createConfirmation, ReactConfirmProps } from "react-confirm";
import { Modal } from "./modal";

const useStyles = makeStyles({
  content: {
    display: "grid",
    placeItems: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    maxWidth: "300px",
    maxHeight: "200px",
    width: "50vw",
    minWidth: "128px",
    backgroundColor: "rgb(18,18,18)",
    color: "white",
    border: "solid white 2px",
    borderRadius: "24px",
    boxShadow: "0px 0px 20px grey",
    padding: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    fontSize: "1rem",
    fontFamily: "Consolas",
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
  },
  button: {
    flex: 1,
    border: "solid white 1px",
    color: "white",
    borderRadius: "5px",
    minHeight: "48px",
    minWidth: "24px",
    fontSize: "1rem",
    cursor: "pointer",
    fontFamily: "Consolas",
  },
  buttonYes: {
    backgroundColor: "white",
    color: "black",
  },
  buttonNo: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});

export const ConfirmComponent = confirmable(({ show, proceed, confirmation = "Are you sure?" }: ReactConfirmProps) => {
  const classes = useStyles();
  return (
    <Modal
      closeTimeoutMS={100}
      isOpen={show}
      style={{ content: { background: "none", border: "none" }, overlay: { backgroundColor: "rgba(0,0,0,0.5)" } }}
    >
      <div className={classes.content}>
        <div className={classes.container}>
          <div style={{ width: "100%", paddingBottom: 24 }}>{confirmation}</div>
          <div className={classes.buttonContainer}>
            <button className={clsx(classes.button, classes.buttonNo)} onClick={() => proceed()}>
              No
            </button>
            <div style={{ flex: 1, maxWidth: 24 }} />
            <button className={clsx(classes.button, classes.buttonYes)} onClick={() => proceed("true")}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
});

export const confirmPromise = createConfirmation(ConfirmComponent);

const confirm = (confirmation: ReactNode): Promise<string> => confirmPromise({ confirmation });
export default confirm;
