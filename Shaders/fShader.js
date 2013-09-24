var fs = "\
precision highp float;\
\
uniform bool uWireframe;\
uniform bool uUseTextures; \
uniform bool uUseShadow; \
uniform float uShininess; \
uniform vec4 uLightAmbient;\
uniform vec4 uLightDiffuse;\
uniform vec4 uLightSpecular;\
\
uniform vec4 uMaterialAmbient;\
uniform vec4 uMaterialDiffuse;\
uniform vec4 uMaterialSpecular;\
uniform vec4 uPickingColor;\
uniform bool uOffscreen;\
\
uniform sampler2D uSampler;  \
uniform float uAlpha;\
\
varying vec3 vNormal; \
varying vec3 vLightRay;\
varying vec3 vEyeVec;\
varying vec4 vFinalColor;\
varying vec2 vTextureCoord;\
\
void main(void)\
{\
\
    if(uOffscreen)\
    {\
        gl_FragColor = uPickingColor;\
        return;\
    }\
\
    if(uWireframe)\
        gl_FragColor = vFinalColor;\
    else\
    {\
        vec4 Ia = uLightAmbient * uMaterialAmbient;\
        vec3 L = normalize(vLightRay);\
        vec3 N = normalize(vNormal);\
        float lambertTerm = max(dot(N,-L),0.4);\
        vec4 Id = uLightDiffuse * uMaterialDiffuse * lambertTerm;\
        vec3 E = normalize(vEyeVec);\
        vec3 R = reflect(L, N);\
        float specular = pow( max(dot(R, E), 0.5),uShininess);\
        vec4 Is = specular*0.3*uMaterialSpecular * uLightSpecular;\
        vec4 finalColor = Ia + Id + Is;\
        finalColor.a = uAlpha;\
\
       if (uUseTextures)\
       {\
           if(uUseShadow)\
                gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t))* finalColor ;\
           else\
                gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)) * finalColor.a;\
        }\
        else\
           gl_FragColor = finalColor;\
    }\
}"


//if(vEyeVec[1]<0.0)