import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isPending: isAdminLoading, error } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            if (!user || !user.email) {
                throw new Error("User email is not available");
            }
            console.log('asking or checking is admin', user);
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            console.log('API Response:', res.data);
            return res.data?.admin;
        }
    });

    if (error) {
        console.error('Error fetching admin status:', error);
    }

    console.log('isAdmin:', isAdmin, 'isAdminLoading:', isAdminLoading);

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
