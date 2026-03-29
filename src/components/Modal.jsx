export function Modal({warning, setWarning, onConfirm, disableButton}) {
    return (
        <>
        {warning && (
        <div className="modal">
            <h3>{warning}</h3>
            <div className="btns">
            <button onClick={() => {onConfirm()}}>yes</button>
            <button onClick={() => {
                setWarning("")
                disableButton(false)
            }}>no</button>
            </div>
        </div>
        )}
        </>
    )
}