// 作者：ryk

precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uIntensity;

varying vec2 vUv;

float random(vec2 st){
    return fract(
        sin(dot(st.xy, vec2(12.9898,78.233)))
        *43758.5453123
    );
}

float noise(vec2 p){

    vec2 i=floor(p);
    vec2 f=fract(p);

    float a=random(i);
    float b=random(i+vec2(1.0,0.0));
    float c=random(i+vec2(0.0,1.0));
    float d=random(i+vec2(1.0));

    vec2 u=f*f*(3.0-2.0*f);

    return mix(a,b,u.x)
        +(c-a)*u.y*(1.0-u.x)
        +(d-b)*u.x*u.y;
}

float scanLine(vec2 uv){

    return sin(
        uv.y*uResolution.y*1.25
    )*0.04;
}

float vignette(vec2 uv){

    uv-=0.5;

    float d=dot(uv,uv);

    return smoothstep(
        0.42,
        0.18,
        d
    );
}

void main(){

    vec2 uv=vUv;

    float n=noise(
        uv*vec2(900.0,450.0)
        +uTime*20.0
    );

    float grain=(n-0.5)*0.18;

    float scan=scanLine(uv);

    float flash=
        random(vec2(
            floor(uTime*8.0)
        ))*0.08;

    float vig=vignette(uv);

    vec3 color=vec3(0.0);

    color+=grain;

    color+=scan;

    color+=flash;

    color*=vig;

    color*=3.5;

    float alpha=
        (
            abs(grain)
            +abs(scan)
            +flash
        )*uIntensity;

    alpha*=vig;

    gl_FragColor=vec4(color,alpha);
}