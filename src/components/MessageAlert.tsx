import Alert from 'react-bootstrap/Alert';

type AlertType = 'danger' | 'warning' | 'success';

export interface MessageAlertElement {
  message: string | unknown;
  visible: boolean;
  type?: AlertType;
}

interface MessageAlertProps {
  showAlert: MessageAlertElement;
}

function MessageAlert({ showAlert }: MessageAlertProps) {
  if (showAlert.visible)
    return (
      <Alert
        variant={showAlert.type}
        className="mb-0"
        // onClose={() =>
        //   setShowAlert({
        //     message: '',
        //     visible: false
        //   })
        // }
      >
        {`${showAlert.message}`}
      </Alert>
    );
}

export default MessageAlert;
