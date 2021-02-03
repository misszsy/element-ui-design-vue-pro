export const presets = [
  "@vue/cli-plugin-babel/preset",
  [
    "@babel/preset-env",
    {
      modules: false
    }
  ]
];
export const plugins = [
  [
    "component",
    {
      libraryName: "element-ui",
      styleLibraryName: "theme-chalk"
    }
  ]
];
