import {FC} from 'react'

interface Props {

}

const Card: FC<Props> = ({ children }) => <div className="rounded-xl shadow-xl p-6 bg-white">{children}</div>

export default Card
