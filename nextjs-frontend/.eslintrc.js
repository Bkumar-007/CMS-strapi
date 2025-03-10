module.exports = {
    extends: ["next/core-web-vitals"], // Add Next.js ESLint rules
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "react-hooks/exhaustive-deps": "warn"
    }
  };