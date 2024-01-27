import { Select, SelectItem } from "@nextui-org/react";

export default function ResultsSelectBox({
  radius,
  className,
  data,
  color,
  ariaLabel,
  variant,
  labelPlacement,
  size,
  onChange,
  propsYears,
  selectedKeys,
}: ResultsSelectBoxProps) {
  console.log(propsYears);
  return (
    <>
      <Select
        radius={radius}
        className={className}
        color={color}
        aria-label={ariaLabel}
        variant={variant}
        labelPlacement={labelPlacement}
        size={size}
        onChange={onChange}
        selectedKeys={selectedKeys}
      >
        {(propsYears || []).map((year) => (
          <SelectItem
            key={year.toString()}
            value={year.toString()}
            textValue={year.toString()}
          >
            {year.toString()}
          </SelectItem>
        ))}
      </Select>
    </>
  );
}
