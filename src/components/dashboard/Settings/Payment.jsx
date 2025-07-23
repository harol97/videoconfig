import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SEND } from '@/store';
import { useDispatch, useSelector } from "react-redux";
import CardSave from './SaveCardForm'
import CircularProgress from '@mui/material/CircularProgress';
import { Trash2 } from 'lucide-react';

export default function Payment({ activeTab }) 
{
  const { userDetailsLoading, checkedShowProfile, cardList, cardLoading } = useSelector((state) => state.models);
  const userData = useSelector((state) => state.auths);
    const role = import.meta.env.VITE_ACTIVE_ROLE || "teacher";

  const { control, handleSubmit, reset, register, watch, formState: { errors } } = useForm({});
  // 
  const dispatch = useDispatch();
  // 
  // const onSubmit = async (d) => {
  //   try {
  //     const { image } = d;
  //     // 
  //     dispatch.models.SET({
  //       userUpdateLoading: true
  //     });
  //     // 
  //     // 
  //     let params = {
  //       ...d,
  //       image: image && await fileToBase64(image[0]),
  //       role: 'student'
  //     };
  //     // console.log(params)
  //     // 
  //     return SEND('user/update', params);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // 
  // useEffect(() => {
  //   SEND('stripe/intent', {});
  //   dispatch.models.SET({
  //     cardLoading: true
  //   })
  // }, [])
  // 
  
  const gridContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px", // same as Bootstrap g-2
  };
  // 
  const columnStyle = {
    flex: "0 0 calc(33.333% - 8px)", // roughly col-4 with 8px gap
    boxSizing: "border-box"
  };
  // 
  return (
    <div className={`tabs__pane -tab-item-2 ${activeTab == 2 ? "is-active" : ""} `}>
      <div>
        <div>
          <div>
            <CardSave />

            {cardLoading ? 
              <div className="mt-4">
                <CircularProgress />
              </div> 
            : 
            <div className="mt-4">
              <div className="" style={gridContainerStyle}>
                {cardList.map((card, index) => (
                  <div 
                    className="col-md-4 gap-2 g-2" 
                    style={{
                      border: "1px solid #dee2e6",
                      padding: "1rem",
                      borderRadius: "0.375rem",
                      ...columnStyle
                    }} 
                    key={card.id || index}
                  >
                    <div className="card shadow-sm position-relative">
                      <div className="position-absolute top-0 end-0" style={{ textAlign: 'right', paddingRight: "8px"}}>
                        <Trash2
                          // onClick={() => SEND('stripe/remove', {
                          //   paymentMethodId: card.paymentMethodId
                          // })}
                          size={18}
                          style={{ color: '#f56565', cursor: 'pointer' }}
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title text-capitalize">{card.brand.toUpperCase()}</h5>
                        <p className="card-text mb-1">
                          <strong>Last 4 Digits:</strong> •••• {card.last4}
                        </p>
                        <p className="card-text mb-1">
                          <strong>Country:</strong> {card.country}
                        </p>
                        <p className="card-text mb-0">
                          <strong>Expires:</strong> {card.exp_month}/{card.exp_year}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>}

          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
}
