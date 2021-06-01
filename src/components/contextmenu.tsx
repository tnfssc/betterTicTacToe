import * as React from "react";
import { FC, HTMLAttributes, ReactNode, useState } from "react";
import { Menu, Item, useContextMenu, ItemProps, animation } from "react-contexify";

const ContextMenu: FC<
  { menuItems?: ItemProps[]; menuChildren?: ReactNode } & React.DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
> = ({ children, menuItems, menuChildren, ...props }) => {
  const [MENU_ID] = useState(() => `ID-${Math.random() * 10000}`);
  const { show } = useContextMenu({
    id: MENU_ID,
  });
  return (
    <>
      <div {...props} onContextMenu={show}>
        {children}
      </div>
      <Menu id={MENU_ID} theme="dark" animation={animation.fade} style={{ minWidth: 0 }}>
        {menuItems?.map((itemProps, i) => (
          <Item key={`${MENU_ID}:item-${i}`} {...itemProps} />
        ))}
        {menuChildren}
      </Menu>
    </>
  );
};

export default ContextMenu;
