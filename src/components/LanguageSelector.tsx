import * as React from 'react'
import Flag from 'react-country-flag'

import styles from '../styles/components.module.scss'

type SupportedLanguages = "en" | "es"

type Props = {
  selectedLanguage: string
  languages: {
    countryCode: string
    languageCode: SupportedLanguages
  }[]
  onChange: (languageCode: SupportedLanguages) => void
}

export const LanguageSelector: React.FC<Props> = ({
  selectedLanguage,
  languages,
  onChange,
}) => {
  return (
    <div className={styles.langSelector}>
      <span>
        <Flag
          className={selectedLanguage === "en" ? "" : "selected"}
          countryCode="US"
          style={{ fontSize: "2em", lineHeight: "2em" }}
          svg={true}
          onClick={() => onChange("en")}
        />
      </span>
      <Flag
        className={selectedLanguage === "es" ? "" : "selected"}
        countryCode="MX"
        style={{ fontSize: "2em", lineHeight: "2em" }}
        svg={true}
        onClick={() => onChange("es")}
      />
    </div>
  )
}
