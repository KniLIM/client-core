import React, {CSSProperties} from 'react';
import useService, {TABS} from 'app/Service';
import {Menu, Dropdown, Button, Avatar} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {UserOutlined} from '@ant-design/icons';
import {BellOutlined, CommentOutlined, TeamOutlined} from '@ant-design/icons/lib';


/**
 * 顶部栏，包含了头像以及头像引发的下拉菜单，三个按钮
 * 三个按钮的跳转逻辑已完成
 * todo: 1.头像配饰 2.头像下拉菜单及其逻辑
 * @param propStyle
 */
export default (propStyle: CSSProperties) => {
    const {tabBar, setTabBar} = useService()
    const {SubMenu} = Menu;

    const style: CSSProperties = {
        ...propStyle,
        display: "flex",
    }
    const menu = (
        <Menu>
            <Menu.ItemGroup title="Group title">
                <Menu.Item>1st menu item</Menu.Item>
                <Menu.Item>2nd menu item</Menu.Item>
            </Menu.ItemGroup>
            <SubMenu title="sub menu">
                <Menu.Item>3rd menu item</Menu.Item>
                <Menu.Item>4th menu item</Menu.Item>
            </SubMenu>
            <SubMenu title="disabled sub menu" disabled>
                <Menu.Item>5d menu item</Menu.Item>
                <Menu.Item>6th menu item</Menu.Item>
            </SubMenu>
        </Menu>
    );

    return (
        <div style={style}>
            <Dropdown overlay={menu}>
                <div style={{marginLeft: "1.2rem",marginTop:"-0.5%"}}>
                    <Avatar
                        size={"large"}
                        icon={<UserOutlined/>}
                        style={{marginRight: "1rem"}}
                    />
                    <DownOutlined/>
                </div>
            </Dropdown>
            <Button
                style={{marginLeft: "30%"}}
                type={tabBar === TABS.CHAT ? "primary" : "dashed"}
                shape="circle"
                icon={<CommentOutlined/>}
                onClick={() => setTabBar(TABS.CHAT)}
            />
            <Button
                style={{marginLeft: "2%"}}
                type={tabBar === TABS.LIST ? "primary": "dashed"}
                shape="circle"
                icon={<TeamOutlined/>}
                onClick={() => setTabBar(TABS.LIST)}
            />
            <Button style={{marginLeft: "2%"}}
                    type={tabBar === TABS.MESSAGE ? "primary" : "dashed"}
                    shape="circle"
                    icon={<BellOutlined />}
                    onClick={() => setTabBar(TABS.MESSAGE)}
            />
        </div>
    )
}
