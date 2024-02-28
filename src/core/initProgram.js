function initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE) {
      // 创建着色器
      const vertexShader = gl.createShader(gl.VERTEX_SHADER);
      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

      gl.shaderSource(vertexShader, VERTEX_SHADER_SOURCE); // 指定顶点着色器源代码
      gl.shaderSource(fragmentShader, FRAGMENT_SHADER_SOURCE); // 指定片元着色器源代码

      // 编译着色器
      gl.compileShader(vertexShader);
      if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
          console.error(`编译顶点着色器失败：${gl.getShaderInfoLog(vertexShader)}`);
      }

      gl.compileShader(fragmentShader);
      if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
          console.error(`编译片元着色器失败：${gl.getShaderInfoLog(fragmentShader)}`);
      }

      // 创建程序对象
      const program = gl.createProgram();

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);

      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.error(`链接程序失败：${gl.getProgramInfoLog(program)}`);
      }

      gl.useProgram(program);
      
      return program;
}