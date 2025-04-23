import { css } from "@emotion/react"
import { CSSTransition } from "react-transition-group"
import { useEffect, useRef, useState } from "react"
import { EventHandler } from "../../utils/event"

import Check from "../../assets/check.svg"
import Forbidden from "../../assets/forbidden.svg"
import { omit } from "../../utils/omit"


type NotiType = "allowed" | "forbidden"
interface INotificationInfo {
    type: NotiType
    content: string | undefined
}

export const Notification: React.FC<INotificationInfo> = (props) => {
    const [mounted, setMounted] = useState(false)
    const nodeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setMounted(true)
        setTimeout(() => {
            setMounted(false)
        }, 3000)
    }, [])

    return (    
        <CSSTransition nodeRef={nodeRef} in={mounted} timeout={400} mountOnEnter unmountOnExit classNames="notification">
            <div
                css={css`
                    padding: 8px;
                    border-radius: 8px;
                    background-color: #ffffff;
                    display: flex;
                    flex-direction: row;
                    gap: 8px;
                    align-items: center;
                    box-shadow: #dadfe366 0px 4px 8px;
                    white-space: nowrap;
                    position: relative;
                    width: fit-content;

                    @keyframes open {
                        from {
                            top: -50px;
                        }
                        to { 
                            top: 0px;
                        }
                    }

                    @keyframes close {
                        0% {
                            opacity: 1;
                        }
                        100% {
                            opacity: 0;
                        }
                    }

                    &.notification-enter-active {
                        animation: open 0.4s ease forwards;
                    }

                    &.notification-exit-active {
                        animation: close 0.4s ease forwards;
                    }
                `}
                ref={nodeRef}
            >
                <img src={props.type === "allowed" ? Check : Forbidden} height={20} />
                <div>{props.content}</div>
            </div>
        </CSSTransition>
    )
}

export const NotiContainer: React.FC = () => {
    const [contents, setContents] = useState<{ type: NotiType, content: string, key: string }[]>([])

    useEffect(() => {
        EventHandler.addEventListener("notification", (type: NotiType, content: string) => {
            const key = (Date.now() + Math.random()).toString()
            setContents((contents) => [ ...contents, { type, content, key } ])
        })
    }, [])

    return (
        <div
            css={css`
                position: fixed;
                top: 30px;
                left: 50%;
                transform: translate(-50%, 0);
                display: flex;
                flex-direction: column;
                z-index: 100;
                gap: 20px;
                align-items: center;
            `}
        >
            {contents.map((props) => <Notification key={props.key} {...omit(props, "key")} />)}
        </div>
    )
}