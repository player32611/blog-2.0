precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uMirror;
varying vec2 vUv;

vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
    return mod289(((x * 34.0) + 1.0) * x);
}

vec4 permute(vec4 x) {
    return mod((34.0 * x + 1.0) * x, 289.0);
}

float snoise(vec2 v)
{
    const vec4 C = vec4(
        0.211324865405187,
        0.366025403784439,
       -0.577350269189626,
        0.024390243902439
    );

    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);

    vec2 i1 =
        (x0.x > x0.y)
            ? vec2(1.0, 0.0)
            : vec2(0.0, 1.0);

    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;

    i = mod289(i);

    vec3 p =
        permute(
            permute(
                i.y + vec3(0.0, i1.y, 1.0)
            )
            + i.x + vec3(0.0, i1.x, 1.0)
        );

    vec3 m = max(
        0.5 -
        vec3(
            dot(x0, x0),
            dot(x12.xy, x12.xy),
            dot(x12.zw, x12.zw)
        ),
        0.0
    );

    m *= m;
    m *= m;

    vec3 x = 2.0 * fract(p * C.www) - 1.0;

    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    m *=
        1.79284291400159 -
        0.85373472095314 *
        (a0 * a0 + h * h);

    vec3 g;

    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;

    return 130.0 * dot(m, g);
}

float fbm(vec2 p)
{
    float f = 0.0;
    float w = 0.5;

    for(int i = 0; i < 5; i++)
    {
        f += w * snoise(p);
        p *= 2.0;
        w *= 0.5;
    }

    return f;
}

float cellular2x2(vec2 P)
{
    const float K = 1.0 / 7.0;
    const float K2 = K * 0.5;
    const float jitter = 0.8;

    vec2 Pi = mod(floor(P), 289.0);
    vec2 Pf = fract(P);

    vec4 Pfx = Pf.x + vec4(-0.5, -1.5, -0.5, -1.5);
    vec4 Pfy = Pf.y + vec4(-0.5, -0.5, -1.5, -1.5);

    vec4 p = permute(Pi.x + vec4(0.,1.,0.,1.));
    p = permute(p + Pi.y + vec4(0.,0.,1.,1.));

    vec4 ox = mod(p, 7.0) * K + K2;
    vec4 oy = mod(floor(p * K), 7.0) * K + K2;

    vec4 dx = Pfx + jitter * ox;
    vec4 dy = Pfy + jitter * oy;

    vec4 d = dx * dx + dy * dy;

    d.xy = min(d.xy, d.zw);
    d.x = min(d.x, d.y);

    return d.x;
}

void main()
{
    vec2 fragCoord = gl_FragCoord.xy;

    vec2 uv = fragCoord / uResolution;

    uv.x *= uResolution.x / uResolution.y;
    uv.x = mix(uv.x, 1.0 - uv.x, uMirror);

    float speed = 2.0;

    vec2 GA = vec2(
        -uTime * 1.8,
         uTime * 0.9
    ) * speed;

    float A = clamp(
        uv.x - uv.y * 0.3,
        0.0,
        1.0
    );

    float N1 =
        smoothstep(
            0.998,
            1.0,
            1.0 - cellular2x2((uv + GA * 0.1) * 8.0)
        );

    float N2 =
        smoothstep(
            0.995,
            1.0,
            1.0 - cellular2x2((uv + GA * 0.2) * 6.0)
        );

    float N3 =
        smoothstep(
            0.99,
            1.0,
            1.0 - cellular2x2((uv + GA * 0.4) * 4.0)
        );

    float N4 =
        smoothstep(
            0.98,
            1.0,
            1.0 - cellular2x2((uv + GA * 0.6) * 3.0)
        );

    float N5 =
        smoothstep(
            0.98,
            1.0,
            1.0 - cellular2x2((uv + GA) * 1.2)
        );

    float snow =
        0.35 +
        N1 +
        0.85 * N2 +
        0.65 * N3 +
        0.4 * N4 +
        0.25 * N5;

    vec3 bg = mix(
        vec3(0.05,0.08,0.12),
        vec3(0.3,0.45,0.7),
        uv.y
    );

    vec3 snowColor = vec3(
        snow * 0.9,
        snow,
        snow * 1.1
    );

    gl_FragColor = vec4(
        bg + snowColor,
        1.0
    );
}