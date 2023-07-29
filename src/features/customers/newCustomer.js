import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCreateNewCustomerMutation } from './customerApiSlice'

const FIRSTNAME_REGEX = /^[A-z]{2,10}$/
const SURNAME_REGEX = /^[A-z]{2,10}$/

const NewCustomerTicket = () => {
    const randomID = Math.floor(Math.random() * 9000000) + 1000000

    const [addNewCustomer, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useCreateNewCustomerMutation()

    let content

    if (isLoading) content = <div className="loading-screen"/>

    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('')
    const [surname, setSurname] = useState('')
    const [validFirstName, setValidFirstName] = useState(false)
    const [validSurname, setValidSurame] = useState(false)
    const [paid, setPaid] = useState(false)

    useEffect(() => {
        setValidFirstName(FIRSTNAME_REGEX.test(firstName))
    }, [firstName])

    useEffect(() => {
        setValidSurame(SURNAME_REGEX.test(surname))
    }, [surname])

    useEffect(() => {
        if (isSuccess) {
            setFirstName('')
            setSurname('')
            navigate('/customers/new')
        }
    }, [isSuccess, navigate])

    const onFirstNameChanged = e => setFirstName(e.target.value)
    const onSurnameChanged = e => setSurname(e.target.value)

    const checkPayment = () => {
        setPaid(prevPaid => !prevPaid)
    }

    const saved = [randomID, validFirstName, validSurname].every(Boolean)

    const onSaveCustomer = async (e) => {
        e.preventDefault()
        if (saved) {
            await addNewCustomer({ randomID, firstName, surname })
        }
    }

    const errClass = isError? "error" : "offscreen"
    const validFirstNameClass = !validFirstName? "-invalid" : ""
    const validSurnameClass = !validSurname? "-invalid" : ""

    content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <div className="banner">
                <div className="logo"/>
                <div className="name">
                    VINGETTI AMUSEMENT PARK
                </div>
            </div>
            <form classname="new-customer-form" onSubmit={onSaveCustomer}>
                <div className="form-title">
                    <h2>ENTRANCE FEE TICKET</h2>
                </div>
                <div className="same-line">
                    <label>Random ID:</label>
                    <input
                        id="randomID"
                        name="randomID"
                        type="number"
                        readOnly value={randomID}
                    />
                </div>
                <div className="same-line">
                    <label>First Name: </label>
                    <input
                        className={`form-input${validFirstNameClass}`}
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={firstName}
                        onChange={onFirstNameChanged}
                    />
                </div>
                <div className="same-line">
                    <label>Surname: </label>
                    <input
                        className={`form-input${validSurnameClass}`}
                        id="Surname"
                        name="Surname"
                        type="text"
                        value={surname}
                        onChange={onSurnameChanged}
                    />
                </div>
                <div className="same-line">
                    <label>Date: </label>
                    <input 
                        id="date"
                        name="date"
                        type="date"
                        readOnly value={`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`}
                    />
                </div>
                <div className="same-line">
                    <p>Fee: Kshs.1000</p>
                    <br/>
                    <p>Paybill No: 282 7245</p>
                </div>
                <div className="same-line">
                    <label>Has the entrance fee been paid? </label>
                    <input 
                        id="paid"
                        name="paid"
                        type="checkbox"
                        checked={paid}
                        onChange={checkPayment}
                    />
                </div>
                {paid && <button type="submit" className="customer-paid">Join in the fun!</button>}
            </form>
        </>
    )

    return content
}

export default NewCustomerTicket