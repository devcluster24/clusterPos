import { Button, Dropdown, Menu } from "antd";
import { IoMdArrowDropdown } from "react-icons/io";

interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onView,
  onEdit,
  onDelete,
  onDuplicate,
}) => {
  const exportMenu = (
    <Menu style={{ padding: "0px", border: "1px solid lightgray" }}>
      {onView && (
        <Menu.Item
          key="view"
          onClick={onView}
          style={{ borderBottom: "1px solid lightgray" }}
        >
          View
        </Menu.Item>
      )}
      {onEdit && (
        <Menu.Item
          key="edit"
          onClick={onEdit}
          style={{ borderBottom: "1px solid lightgray" }}
        >
          Edit
        </Menu.Item>
      )}
      {onDelete && (
        <Menu.Item
          key="delete"
          onClick={onDelete}
          style={{ borderBottom: "1px solid lightgray" }}
        >
          Delete
        </Menu.Item>
      )}
      {onDuplicate && (
        <Menu.Item
          key="duplicate"
          onClick={onDuplicate}
          style={{ borderBottom: "1px solid lightgray" }}
        >
          Duplicate
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={exportMenu} trigger={["click"]}>
        <Button type="primary" style={{ padding: "2px 6px" }}>
          Action
          <IoMdArrowDropdown className="w-8px -ml-1.5" />
        </Button>
      </Dropdown>
    </>
  );
};

export default ActionButtons;
