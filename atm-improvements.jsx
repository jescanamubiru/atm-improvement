const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
    const choice = ['Deposit', 'Cash Back'];
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
        <label className="label huge">
            <h3> {choice[Number(!isDeposit)]}</h3>
            <input type="number" width="200" onChange={onChange} id="number-input"></input>
            <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
        </label>
    );
};

const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [atmMode, setAtmMode] = React.useState('');
    const [validTransaction, setValidTransaction] = React.useState(false);

    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);

    const handleChange = (event) => {
        const newValue = event.target.value;
        console.log(`handleChange ${newValue}`);
        setDeposit(Number(newValue));

        if (newValue <= 0) {
            setValidTransaction(false);
            return;
        }

        if (atmMode == 'Cash Back' && newValue > totalState) {
            setValidTransaction(false);
            return;
        }

        setValidTransaction(true);

    };
    const handleSubmit = (event) => {
        if (atmMode == 'Deposit') {
            setTotalState(totalState + deposit);
        } else if (atmMode == 'Cash Back') {
            setTotalState(totalState - deposit);
        }

        status = `Account Balance $ ${totalState}`;
        document.getElementById("total").innerHTML = status;
        event.preventDefault();
    };

    const handleModeSelect = (event) => {
        console.log(`handleModeSelect ${event.target.value}`);
        const newAtmMode = event.target.value;
        setAtmMode(newAtmMode);
        switch (newAtmMode) {
            case 'Deposit':
                setIsDeposit(true);
                break;
            case 'Cash Back':
                setIsDeposit(false);
                break;
            default:

        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="row">
                    <h2 id="total">{status}</h2>
                </div>
                <div className="row">
                    <label>Select an action below to continue</label>
                </div>
                <div className="row">
                    <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
                        <option id="no-selection" value=""></option>
                        <option id="deposit-selection" value="Deposit">Deposit</option>
                        <option id="cashback-selection" value="Cash Back">Cash Back</option>
                    </select>
                </div>
                <div className="row">
                    {
                        atmMode !== '' && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
                    }
                </div>
            </div>
        </form>
    );


};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
