import { memo, useState } from "react";
import LanguageMessage from "../../LanguageMessage/LanguageMessage";
import "./editor-property.scss";

const EditorProperty = ({ createProperty, setCreateProperty }) => {
  const [formData, setFormData] = useState(createProperty);
  const [save, setSave] = useState(true);
  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setSave(false);
  };
  const handleRadio = (event) => {
    const { name } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      dashes: name === "dashes",
    }));
    setSave(false);
  };
  const handleCheckbox = ({ target }) => {
    const { name } = target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: !formData[name],
    }));
    setSave(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setCreateProperty(formData);
    setSave(true);
  };
  return (
    <section className="editor-property position-absolute d-flex flex-column justify-content-start bg-primary ">
      <form
        className="d-flex flex-column justify-content-start"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <label htmlFor="label" className="name-label cursor-pointer">
          <LanguageMessage message="lessonName" />
        </label>
        <input
          id="label"
          type="text"
          name="label"
          className="text-input"
          value={formData.label}
          onChange={handleInput}
        />
        <label htmlFor="unit" className="unit-label  cursor-pointer">
          <LanguageMessage message="unitCount" />
        </label>
        <input
          id="unit"
          type="number"
          min={1}
          max={10}
          name="unit"
          placeholder="1 - 10"
          className="number-input"
          value={formData.unit}
          onChange={handleInput}
        />
        <label
          htmlFor="prerequisite"
          className="d-flex align-items-center justify-content-between cursor-pointer"
        >
          <span className="d-inline-block">
            <LanguageMessage message="prerequisite" />
          </span>
          <input
            id="prerequisite"
            type="radio"
            name="solid"
            checked={!formData.dashes}
            onChange={handleRadio}
          />
          <div className="radio-button" />
        </label>
        <label
          htmlFor="co-requisite"
          className="co-requisite d-flex align-items-center justify-content-between cursor-pointer"
        >
          <span className="d-inline-block">
            <LanguageMessage message="co-requisite" />
          </span>
          <input
            id="co-requisite"
            type="radio"
            name="dashes"
            checked={formData.dashes}
            onChange={handleRadio}
          />
          <div className="radio-button" />
        </label>
        <label
          htmlFor="connector"
          className=" d-flex align-items-center justify-content-between cursor-pointer "
        >
          <span className="d-inline-block">
            <LanguageMessage message="connector" />
          </span>
          <input
            id="connector"
            type="checkbox"
            name="connector"
            checked={formData.connector}
            onChange={handleCheckbox}
          />
          <div className="checkbox-button position-relative" />
        </label>
        <label
          htmlFor="mainConnector"
          className="mainConnector d-flex align-items-center justify-content-between cursor-pointer "
        >
          <span className="d-inline-block text-nowrap">
            <LanguageMessage message="mainConnector" />
          </span>
          <input
            id="mainConnector"
            type="checkbox"
            name="mainConnector"
            checked={formData.mainConnector}
            onChange={handleCheckbox}
          />
          <div className="checkbox-button position-relative" />
        </label>
        <button
          className={`handle-form w-100 ${save} text-center rounded-1 bg-secondary text-primary cursor-pointer transition`}
        >
          <LanguageMessage message="save" />
        </button>
      </form>
      <div className="network-button bg-gray w-100 bg-secondary text-primary" />
      <div className="network-button bg-gray w-100 bg-secondary text-primary" />
    </section>
  );
};

export default memo(EditorProperty);
