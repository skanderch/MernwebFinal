import React from "react";
import { Modal, message } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { DeleteNotification } from "../apicalls/notifications";
import { SetLoader } from "../redux/loadersSlice";
import { useDispatch } from "react-redux";
import "./notifications.css"; // Import the CSS file

function Notifications({
  notifications = [],
  reloadNotifications,
  showNotifications,
  setShowNotifications,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteNotification = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteNotification(id);
      dispatch(SetLoader(false));

      if (response.success) {
        message.success(response.message);
        reloadNotifications(); // Reload notifications after successful deletion
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  return (
    <Modal
      title="Notifications"
      visible={showNotifications}
      onCancel={() => setShowNotifications(false)}
      footer={null}
      centered
      width={1000}
    >
      <div className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <div
            key={notification._id}
            className="notification-card flex flex-col gap-2 items-center cursor-pointer"
          >
            <h1>{notification.title}</h1>
            <span>{notification.message}</span>
            <span className="text-gray-400">
              {moment(notification.createdAt).fromNow()}
            </span>
            <div className="flex justify-between items-center">
              <div
                onClick={() => {
                  navigate(notification.onClick);
                  setShowNotifications(false);
                }}
              >
                {/* Icon for navigating on click */}
              </div>
              <i
                className="ri-delete-bin-6-line"
                onClick={() => deleteNotification(notification._id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default Notifications;
