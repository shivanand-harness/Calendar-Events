function getComputedStyleInPx(
  element: HTMLElement,
  property: any,
  tempElement: HTMLElement
): number {
  const computedStyle = window.getComputedStyle(element);
  const value = computedStyle.getPropertyValue(property);

  if (value.endsWith("px")) {
    return parseFloat(value); // Already in px
  }

  // Create a temporary element for conversion
  tempElement.style.position = "absolute";
  tempElement.style.visibility = "hidden";
  tempElement.style.height = value; // Apply the value

  const computedStyleOfTempElement = window.getComputedStyle(tempElement);
  const convertedValue = computedStyleOfTempElement
    .getPropertyValue("height")
    .trim();
  return parseFloat(convertedValue);
}

export function getComputedStylesInPx(
  element: HTMLElement,
  properties: string[]
) {
  const tempElement = document.createElement("div") as HTMLElement;
  document.body.appendChild(tempElement);
  const result = properties.map((property) =>
    getComputedStyleInPx(element, property, tempElement)
  );
  document.body.removeChild(tempElement);
  return result;
}
