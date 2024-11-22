interface Props {
  title: string | undefined;
  value: string | undefined;
}

function CardTitleAndValue({ title, value }: Props) {
  return (
    <div className="flex-1">
      <p className="text-mediphix_text_c text-sm">{title}</p>
      <p>{value}</p>
    </div>
  );
}

export default CardTitleAndValue;
