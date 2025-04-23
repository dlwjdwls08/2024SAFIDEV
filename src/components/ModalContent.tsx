import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { HFlexBox } from "./common/FlexBox"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { css } from "@emotion/react"

import Image1 from "../assets/info/slide1.png"
import Image2 from "../assets/info/slide2.png"
import Image3 from "../assets/info/slide3.png"
import Image4 from "../assets/info/slide4.png"
import Image5 from "../assets/info/slide5.png"
import Image6 from "../assets/info/slide6.png"
import Image7 from "../assets/info/slide7.png"
import Image8 from "../assets/info/slide8.png"
import Image9 from "../assets/info/slide9.png"
import Image10 from "../assets/info/slide10.png"
import Image11 from "../assets/info/slide11.png"
import Image12 from "../assets/info/slide12.png"

const images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9, Image10, Image11, Image12]

export const ModalContent: React.FC = () => { 
    const [idx, setIdx] = useState(0)

    return (
        <HFlexBox gap={32} center>
            <FontAwesomeIcon
                icon={faAngleLeft}
                onClick={(e) => {
                    e.stopPropagation()
                    if (idx === 0) return
                    setIdx(idx - 1)
                }}
                css={css`
                    color: ${idx === 0 ? "#202020" : "gray"};
                    cursor: ${idx === 0 ? "not-allowed" : "pointer"};
                `}
                size="4x"
            />
            <img src={images[idx]} css={css`width: 600px;`} />
            <FontAwesomeIcon
                icon={faAngleRight}
                onClick={(e) => {
                    e.stopPropagation()
                    if (idx === images.length - 1) return
                    setIdx(idx + 1)
                }}
                css={css`
                    color: ${idx === images.length - 1 ? "#202020" : "gray"};
                    cursor: ${idx === images.length - 1 ? "not-allowed" : "pointer"};
                `}
                size="4x"
            />
        </HFlexBox>
    )
}