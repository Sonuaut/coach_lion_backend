import { supabase } from '../../../config/supabase';
import { v4 as uuidv4 } from 'uuid';
import { throwDBError } from '../../../utils/error.utils';
import { ifError } from 'assert';
export class AuthDatabase {
    private readonly usersTable = 'users';
    private readonly otpTable = 'otp_verification';

    // Health check
    async checkConnection(): Promise<boolean>  {
        try {
            // Check auth connection
            const { data: authData, error: authError } = await supabase.auth.getSession();
            console.log("authData", authData);
            if (authError) {
                console.error("❌ Supabase connection failed:", authError.message);
                return false;
              } else {
                console.log("✅ Supabase connection is successful!");
                return true;
              }
        } catch (error) { 
            console.error('❌ Failed to connect to Supabase:', error);
            return false;
        }
    }

    async getUserByEmail(email: string) {
        try {
            const { data, error } = await supabase
                .from(this.usersTable)
                .select('*')
                .eq('email', email)
                .single();

            if (error) 
                throwDBError(error)
            
            return { data, error: null };
        } catch (error) {
            console.error("Error checking email:", error);
            return { data: null, error };
        }
    }

    async signup(profileData: {  name: string; email: string }) {
     
            const userId = uuidv4();
            const { data, error } = await supabase
                .from(this.usersTable)
                .insert([{
                    id: userId,
                    name: profileData.name,
                    email: profileData.email,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }])
                .select()
                .single();

           if(error)
            throwDBError(error);
            return data;
    }

    // async getUserProfile(userId: string) {
    //     const { data, error } = await supabase
    //         .from(this.get)
    //         .select('*')
    //         .eq('id', userId)
    //         .single();

    //     if (error) throw error;
    //     return data;
    // }

    // async signIn(email: string, password: string) {
    //     const { data, error } = await supabase.auth.signInWithPassword({
    //         email,
    //         password,
    //     });

    //     if (error) throw error;
    //     return data;
    // }

    // async signOut() {
    //     const { error } = await supabase.auth.signOut();
    //     if (error) throw error;
    // }

    // async getSession() {
    //     const { data: { session }, error } = await supabase.auth.getSession();
    //     if (error) throw error;
    //     return session;
    // }

    // async getUser() {
    //     const { data: { user }, error } = await supabase.auth.getUser();
    //     if (error) throw error;
    //     return user;
    // }

    // // OTP operations
    // async saveOTP(email: string, otp: string) {
    //     const expiresAt = new Date();
    //     expiresAt.setMinutes(expiresAt.getMinutes() + 10); // OTP expires in 10 minutes

    //     const { error } = await supabase
    //         .from(this.otpTable)
    //         .insert([{
    //             email,
    //             otp,
    //             expires_at: expiresAt.toISOString()
    //         }]);

    //     if (error) throw error;
    // }

    // async verifyOTP(email: string, otp: string): Promise<boolean> {
    //     const { data, error } = await supabase
    //         .from(this.otpTable)
    //         .select('*')
    //         .eq('email', email)
    //         .eq('otp', otp)
    //         .eq('is_used', false)
    //         .gt('expires_at', new Date().toISOString())
    //         .order('created_at', { ascending: false })
    //         .limit(1)
    //         .single();

    //     if (error || !data) return false;

    //     // Mark OTP as used
    //     await supabase
    //         .from(this.otpTable)
    //         .update({ is_used: true })
    //         .eq('id', data.id);

    //     return true;
    // }

    // async markUserAsVerified(email: string) {
    //     const { error } = await supabase
    //         .from(this.usersTable)
    //         .update({ is_verified: true })
    //         .eq('email', email);

    //     if (error) throw error;
    // }

    // async resetPassword(email: string) {
    //     const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    //         redirectTo: `${process.env.FRONTEND_URL}/reset-password`,
    //     });

    //     if (error) throw error;
    //     return data;
    // }

    // async updatePassword(password: string) {
    //     const { data, error } = await supabase.auth.updateUser({
    //         password: password
    //     });

    //     if (error) throw error;
    //     return data;
    // }
} 