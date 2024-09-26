const Text = ({ text, fontSize = 16, fontWeight = 'normal', color = '', textDecoration = 'none', textTransform, className, action }) => {
    return <span onClick={action} style={{ fontSize, fontWeight, color, textDecoration, textTransform }} className={className}>{text}</span>
}

export default Text;