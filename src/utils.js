export const getTransitionIdFromData = ({ source, target, sourceHandle, targetHandle }) => `reactflow__edge-${source}${sourceHandle}-${target}${targetHandle}`;

export const findElementByClassNameAfterClickEvent = (event, className) => {
  return event.path?.find((ele) => {
    if (typeof ele.className === 'string') return ele.className.includes(className);
    return false;
  })
}
