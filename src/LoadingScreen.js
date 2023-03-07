import { useProgress } from "@react-three/drei";

export const LoadingScreen = () => {
    const { progress } = useProgress
    return (
        <div>
            <h1>HOLA ESTOY CARGANDO</h1>

        </div>
    )
};

// https://www.youtube.com/watch?v=L12wIvuZTOY&ab_channel=WawaSensei