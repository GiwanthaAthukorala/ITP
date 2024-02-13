import { useEffect,useState } from "react"; 

import PaymentDetails from '../componets/PaymentDetails'
import PaymentForm from '../componets/paymentForm'

const PaymentHome = () =>{
    const [payments ,setPayment]=useState(null);

    useEffect(()=>{
        const fetchPayment = async ()=>{
            const response =await fetch('/api/payment')
            const json = await response.json()


            if (response.ok ){
                setPayment(json)
            }

        }
        fetchPayment()
    },[])

    return(
        <div className="PaymentHome">
           <div className="payment1">
            {payments && payments.map((payment)=>(
               <PaymentDetails key={payment._id} payment={payment} />

            ))}
           </div>
           <PaymentForm/>
        </div>
    )
}

export default PaymentHome;