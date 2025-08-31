const CheckoutHeading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <h1 className="h2-bold my-4">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
      <hr className="my-6" />
    </div>
  );
};

export default CheckoutHeading;
