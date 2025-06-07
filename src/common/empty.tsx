
const Empty = ({text}:{text:string}) => {
    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:6,textAlign:'center', padding:"20px 0"}}>
    <img src='/empty-box.svg' width={100} height={100} style={{opacity:'20%'}} />
    <p style={{fontWeight:600}}>{text}</p>
    </div>
    )
}

export default Empty
