type Props = {
    response:
        | {
              errors: { [key: string]: string[] | undefined } | undefined;
              message: string;
          }
        | {
              message: string;
              errors?: undefined;
          };
};

function Error({ response: { errors, message } }: Props) {
    return (
        <div>
            {errors &&
                Object.entries(errors).map(([key, value]) => (
                    <div key={key} id={`${key}-error`} aria-live="polite">
                        <strong className="">{key}: </strong>
                        <span className="text-sm font-medium">{value}</span>
                    </div>
                ))}

            <div>
                <span className="text-sm font-medium">{message}</span>
            </div>
        </div>
    );
}
export default Error;
