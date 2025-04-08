export default function ProgressBar({ currentStep }) {
  const steps = ["確認購物車", "選擇運送與付款方式", "結帳", "完成訂單"];

  const allCompleted = currentStep === steps.length;

  return (
    <ol className="list-unstyled steps-bar">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isDone = allCompleted || stepNumber < currentStep;
        const isActive = !allCompleted && stepNumber === currentStep;

        return (
          <li
            key={step}
            className={`d-flex flex-column align-items-center
                ${isActive ? "step-active" : isDone ? "step-done" : ""}`}
          >
            <span className="step-circle text-center mb-2">{stepNumber}</span>
            <p className="text-center">{step}</p>
          </li>
        );
      })}
    </ol>
  );
}
