import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const OTP = (props) =>
{
    const { SendTime } = useSelector((state) => state.models);
    const dispatch = useDispatch();
    const { control, handleSubmit, reset, register, getValues, formState: { errors } } = useForm({});
    // 
    useEffect(() => {
        let timeoutr;
        if (SendTime > 0) {
          if (timeoutr) clearTimeout(timeoutr);
          timeoutr = setTimeout(() => {
            dispatch.models.SET({ SendTime: SendTime - 1  });
          }, 1000);
        }
      }, [SendTime]);
    // 
    return <div className="w-100">
        <div className='d-flex py-3'>
            <div className="w-100">{props.otp}</div>

            <button
                type="button"
                onClick={() => props.onSend()}
                disabled={SendTime}
                className="button -sm bg-light-4 text-light-1"
                style={{width: 150}}
            >
                {SendTime > 0 ? SendTime + ' s' : 'Send'}
            </button>
        </div>
        
    </div>
}

export default OTP;