import { useSelector, useDispatch } from 'react-redux';
import './styles.css';
// 
export default () => 
{
    const { M } = useSelector((state) => state.models);
    //
    const dispatch = useDispatch();
    // 
    if(!M) return <></>;
    const { b, bl, bt, bc, c, t } = M;
    // 
    // b ==> button function
    // bl ==> button loading
    // bc ==> button close text
    // bt ==> button submit text
    // b ==> onSubmit
    // 
    const onOk = () => 
    {
        dispatch.models.SET({
            M:{
                ...M,
                bl:true
            }
        });
        b();
    }
    // 
    return <div className="modal">
        <div className="block">
            <div className="main">

                <div className="mtitle">{t ? t: ''}</div>
                
                <div className="con">{c}</div>

                <div className="mfooter">
                    <button
                        className="button -sm bg-light-4 text-light-1 ml-30"
                        onClick={() => dispatch.models.SET({ M: '' })}
                    >
                        {bc || 'Close'}
                    </button>
                    <button
                        loading={bl}
                        type="button"
                        onClick={() => onOk()}
                        className="button -sm -purple-1 text-white"
                    >
                        {bt || 'Confirm'}
                    </button>
                </div>
            </div>
        </div>
    </div>
}