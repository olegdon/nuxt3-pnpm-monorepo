function loadScript(src: string): void {
  document.body.appendChild(
    Object.assign(
      document.createElement('script'),
      {
        src,
        async: true,
      },
    ),
  )
}

export { loadScript }
