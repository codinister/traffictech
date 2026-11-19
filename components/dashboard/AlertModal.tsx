import { useState } from 'react';
type AlertModalProps = {
  openAlert: boolean;
  closeAlert: (data: boolean) => void;
  metricVal: string;
  setMetricVal: (data: string) => void;
};

const AlertModal = ({
  openAlert,
  closeAlert,
  metricVal,
  setMetricVal,
}: AlertModalProps) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleClick = () => {
    if (!inputValue) return setError('Input field required!');

    const calc = Number(metricVal) + 1;
    setMetricVal(String(calc));
    closeAlert(false);

    setError('');
    setInputValue('');
  };

  return (
    <div>
      {openAlert && (
        <div className="modal-backdrop" onClick={() => closeAlert(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <div className="max-w-100 mx-auto p-6 rounded-2xl bg-white">
              <p className="mb-3">Add traffic alert</p>

              <input
                className="py-2 px-2 w-full bg-gray-200 rounded-2xl"
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                className="py-1.5 px-5 rounded-2xl bg-blue-950 text-white text-center hover:bg-blue-600 mt-4"
                onClick={handleClick}
              >
                {error || 'Submit Alert'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertModal;
