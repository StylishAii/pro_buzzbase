import { Select, SelectItem } from "@nextui-org/react";

export default function ResultsSelectBox({
  radius,
  className,
  defaultSelectedKeys,
  data,
  color,
  ariaLabel,
  variant,
  labelPlacement,
  size,
}: ResultsSelectBoxProps) {
  return (
    <>
      <Select
        radius={radius}
        defaultSelectedKeys={defaultSelectedKeys}
        className={className}
        color={color}
        aria-label={ariaLabel}
        variant={variant}
        labelPlacement={labelPlacement}
        size={size}
      >
        {data.map((item) => (
          <SelectItem key={item.label} value={item.label}>
            {item.label}
          </SelectItem>
        ))}
      </Select>
    </>
  );
}
