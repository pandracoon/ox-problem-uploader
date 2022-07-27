import { Button, Menu } from "antd"
import { createElement, useState } from "react"
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Wrapper = styled.div`
    position: absolute;
    width: 256px;
    top: 32px;
    left: 30px;
    .ant-menu-inline-collapsed {
        display: none;
    }
    .ant-menu-inline {
        position: absolute;
        z-index: 100;
    }

`
export const SideNav = () => {
    const [collapsed, setCollapsed] = useState<boolean>(true)
    const toggleCollapsed = () => setCollapsed(p => !p)
    const navigate = useNavigate()
    const toHome = () => {
      setCollapsed(true)
      navigate('/')
    }
    const toPNG = () => {
      setCollapsed(true)
      navigate('/png')
    }
    const toOverview = () => {
      setCollapsed(true)
      navigate('/overview')
    }

    return (
        <Wrapper>
          <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
            {createElement(collapsed ? AiOutlineMenuUnfold : AiOutlineMenuFold, {size: 20})}
          </Button>
          <Menu
            mode="inline"
            theme="light"
            inlineCollapsed={collapsed}
          >
            <Menu.Item key="1" icon={null} onClick={toHome}>
              홈
            </Menu.Item>
            <Menu.Item key="2" icon={null} onClick={toPNG}>
              PNG로 업로드하기
            </Menu.Item>
            <Menu.Item key="3" icon={null} onClick={toOverview}>
              문제 등록 현황
            </Menu.Item>
          </Menu>
      </Wrapper>
    )
}