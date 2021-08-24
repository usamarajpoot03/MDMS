import React from "react";

const ErrorAlert = ({
  timeToShow = 0,
  msg = "Error while performing that operation ",
  alertType = "danger",
  onCloseCallback = () => {},
  showButton = false,
  buttonText = "",
  onButtonClick = () => {},
}) => {
  const [showAlert, setShowAlert] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    //close alert afer specified time
    setTimeout(() => {
      setShowAlert(false);
      onCloseCallback();
    }, timeToShow * 1000);
  }, [timeToShow, onCloseCallback]);

  return showAlert ? (
    <div className={`alert alert-${alertType}`} role="alert">
      <strong>{msg}</strong>{" "}
      {showButton && (
        <div className="action-button" role="button" onClick={onButtonClick}>
          {buttonText}
        </div>
      )}
    </div>
  ) : null;
};
export default ErrorAlert;

//Usage
/*
{this.state.showErrorAlert && (
                    <ErrorAlert
                      timeToShow={3}
                      onCloseCallback={() => {
                        this.setState({ showErrorAlert: false });
                      }}
                    />
                  )}
*/
