import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkBreaks from "remark-breaks";

interface DateFieldType {
  value: string | undefined,
}

interface MultipleFieldsType {
  value: MultipleFieldType[] | undefined,
  bundle: string,
}

interface MultipleFieldType {
  type: string,
  attributes: {
    title: string,
  }
}

interface TextType {
  value: string | undefined,
}

export const MultipleIncludeField: React.FC<MultipleFieldsType> = ({ value, bundle }) => {
  if (value) {
    const renderValue = value?.filter(
      (item) => item.type === `uc--${bundle}`
    );
    return (
      <>
        {renderValue?.length > 0 ? renderValue.map((item) => (item.attributes.title)) : ""}
      </>
    );
  }
}

function isToday(targetDateTime: Date) {
  const currentDate = new Date();
  return (
    targetDateTime.getFullYear() === currentDate.getFullYear() &&
    targetDateTime.getMonth() === currentDate.getMonth() &&
    targetDateTime.getDate() === currentDate.getDate()
  );
}

export const TimeDiffField: React.FC<DateFieldType> = ({ value }) => {
  if (value) {
    // Get now.
    const now = new Date();
    // Convert to formatted ISO 8601 format for Changed.
    const targetDataTime: Date = new Date(value);
    let renderValue = '';
    if (isToday(targetDataTime)) {
      const hourDiff = now.getHours() - targetDataTime.getHours();
      const minutesDiff = now.getMinutes() - targetDataTime.getMinutes();
      renderValue = `${hourDiff}時間前に編集済み`;
      if (hourDiff === 0) {
        renderValue = `${minutesDiff}分前に編集`;
        if (minutesDiff === 0) {
          renderValue = `編集済み`;
        }
      }
    } else {
      renderValue = `${targetDataTime.getFullYear()}/${targetDataTime.getMonth() + 1}/${targetDataTime.getDate()}`;
    }
    return (
      <>
        {renderValue}
      </>
    );
  }
}

export const DateTimeField: React.FC<DateFieldType> = ({ value }) => {
  if (value) {
    // Convert to formatted ISO 8601 format for DeadLine.
    const dlDateTimeObject = new Date(value);
    const renderValue = `${dlDateTimeObject.getFullYear()}/${String(dlDateTimeObject.getMonth() + 1).padStart(2, "0")}/${String(dlDateTimeObject.getDate()).padStart(2, "0")}-${String(dlDateTimeObject.getHours()).padStart(2, "0")}:${String(dlDateTimeObject.getMinutes()).padStart(2, "0")}`;
    return (
      <>
        {renderValue}
      </>
    );
  }
}

export const HtmltoMarkdownField: React.FC<TextType> = ({ value }) => {
  if (value) {
    return (
      <>
        <ReactMarkdown
        remarkPlugins={[remarkBreaks]}
        >
          {value}
        </ReactMarkdown>
      </>
    );
  }
}
